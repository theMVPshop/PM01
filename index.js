// fix styling on netlify login link
window.onload = function() {
   let identity = document.getElementsByClassName('netlify-identity-button');
   identity[0].classList.add('nav-link');
};

function numbaClick(e){
	
	let numba = document.getElementsByClassName('numba');
	let hLines = document.getElementsByClassName('hLines');
	let bText = document.getElementsByClassName('bText');

	// remove selected
	for (let a=0; a<numba.length; a++){
		numba[a].classList.remove('selected');
		hLines[a].classList.add('hideit');
		bText[a].classList.add('hideit');
}
