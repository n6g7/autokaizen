function printEventPolyfill() {
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print')
    mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
        window.onbeforeprint && window.onbeforeprint()
      } else {
        window.onafterprint && window.onafterprint()
      }
    })
  }
}

printEventPolyfill()
