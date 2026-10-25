function decorateLinks() {
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname) {
      links[i].target = "_blank";
      links[i].setAttribute("rel", "noopener noreferrer");
      links[i].classList.add("externalLink");
    } else {
      links[i].classList.add("localLink");
    }
  }
}

/* With navigation.instant, Material swaps page content without a full
   reload; document$ emits on every page change, including the first. */
if (window.document$) {
  window.document$.subscribe(decorateLinks);
} else {
  decorateLinks();
}
