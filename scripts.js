function switchMode () {
  var darkmodeClass = 'darkmode';
  var body = document.getElementsByTagName('body')[0];
  if (body.classList.contains(darkmodeClass)) {
    body.classList.remove(darkmodeClass);
  } else {
    body.classList.add(darkmodeClass);
  }
}
