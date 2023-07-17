// class ElementControl {
//   constructor(elementRefs) {
//     this.elementRefs = elementRefs;
//   }

//   disable() {
//     this.elementRefs.setAttribute('disabled', 'true');
//   }

//   enable() {
//     this.elementRefs.removeAttribute('disabled');
//   }

//   toggleIcon() {
//     const iconRefs = this.elementRefs.querySelectorAll('img');
//     iconRefs.forEach(icon => icon.classList.toggle('is-hidden'));
//     return this;
//   }

//   hide() {
//     this.elementRefs.classList.add('is-hidden');
//   }

//   show() {
//     this.elementRefs.classList.remove('is-hidden');
//   }

//   setText(text) {
//     this.elementRefs.querySelector('span').textContent = text;
//   }
// }

// export default ElementControl;
