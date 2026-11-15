/** Structural backgrounds only. Cards and nested section content keep their own fills. */
export function pageSurfaces() {
  return [...document.querySelectorAll('main section, main > article, footer.footer')]
    .filter(section => !section.parentElement?.closest('main section'))
    .flatMap(section => section.classList.contains('eima-three-r')
      ? [...section.querySelectorAll('[data-water-tone]')]
      : [section]);
}
