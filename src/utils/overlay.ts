import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Holds the page still behind an overlay.
 *
 * Without this the search dialog and the figure viewer float over a page that
 * still scrolls under the pointer, so dismissing the overlay drops the reader
 * somewhere they never chose to be. The scrollbar's own width is compensated so
 * locking does not shift the layout sideways by 8px on desktop.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [active]);
}

/**
 * Keeps Tab inside an overlay and hands focus back where it came from.
 *
 * A dialog that does not trap focus lets the next Tab land on the page behind
 * it, which a screen reader still announces as if it were reachable. Restoring
 * focus to the trigger on close matters just as much: without it the reader is
 * returned to the top of the document every time they dismiss a dialog.
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
) {
  // Held in a ref so a caller passing an inline arrow does not tear down and
  // rebuild the key listener on every render. Written in an effect rather than
  // during render, which is not a safe time to touch a ref.
  const escapeRef = useRef(onEscape);
  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        escapeRef.current?.();
        return;
      }
      if (event.key !== 'Tab' || !container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Only steal focus back if it is still inside the overlay being torn down.
      if (container && container.contains(document.activeElement)) {
        previouslyFocused?.focus?.();
      }
    };
  }, [active, containerRef]);
}

/**
 * Scrolls a horizontal rail so the active item is visible, and reports whether
 * the rail has reached its trailing edge so the fade-out cue can be dropped.
 */
export function scrollItemIntoView(item: HTMLElement | null) {
  if (!item) return;
  item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

/**
 * Arrow-key movement for a `role="tablist"`.
 *
 * A tablist is a single stop in the tab order: Tab reaches it, arrows move
 * within it. Without this every tab is its own stop, so a keyboard user walks
 * through six value pillars one Tab at a time before reaching the panel those
 * tabs control — and the roving `tabIndex` that would fix it does nothing on its
 * own, because nothing would move the focus.
 *
 * Attach to the tablist container; it reads the tabs out of the DOM so callers
 * do not have to keep a parallel list of refs.
 */
export function handleTablistKeys(
  event: React.KeyboardEvent<HTMLElement>,
  onSelectIndex: (index: number) => void,
) {
  const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
  if (!keys.includes(event.key)) return;

  const tabs = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
  );
  if (tabs.length === 0) return;

  const current = tabs.findIndex((t) => t === document.activeElement);
  if (current === -1) return;

  let next = current;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = tabs.length - 1;

  event.preventDefault();
  onSelectIndex(next);
  tabs[next].focus();
}
