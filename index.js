// Formulario

const imageButton = document.querySelector('#image');

const imageSelector = document.querySelector('#image-selector');

const saveButton = document.querySelector('#save-note');

saveButton.addEventListener('click', saveNote);

function saveNote(){
	let title = document.querySelector('#title').value;
	let description = document.querySelector('#description').value;
	let image;
	if(buttonColor.classList.contains("selected")){
		image = buttonColor.style.backgroundColor;
	}else {
		image = buttonImage.src;
	}

	const note = {
		title,
		description,
		image
	}

	if (localStorage.getItem('notes') ===  null) {
		let notes = [];
		notes.push(note);
		localStorage.setItem('notes', JSON.stringify(notes));
	} else {
		let notes = JSON.parse(localStorage.getItem('notes'));
		notes.push(note);
		localStorage.setItem('notes', JSON.stringify(notes));
	}

	document.querySelector('#notes').innerHTML = '';

	showNotes();
}

function showNotes(){
	let notes = JSON.parse(localStorage.getItem('notes'));
	let notesView = document.querySelector('#notes');

	// for(let i = 0; i < notes.length; i++){
	// 	console.log(notes[i]);
	// }

	notes.forEach((element) => {
		let title = element.title;
		let description = element.description;
		let image = element.image;

		if (image.includes('file')) {
			notesView.innerHTML += 
			`<div class="card">
				<img src="${image}" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">${title}</h5>
					<p class="card-text">${description}</p>
				</div>

				<div class="note-config">
					<div class="config-buttons">
						<button class="btn btn-primary" onclick="expandNote('${title}')">View</button>
						<button class="btn btn-primary btn-danger" onclick="deleteNote('${title}')"><i class="bi bi-trash"></i></button>
					</div>
				</div>
			</div>`
		}

		else {
			notesView.innerHTML += 
			`<div class="card">
				<div class="card-color-top" style="background-color:${image}"></div>
				<div class="card-body">
					<h5 class="card-title">${title}</h5>
					<p class="card-text">${description}</p>
				</div>
				<div class="note-config">
					<div class="config-buttons">
						<button class="btn btn-primary" onclick="expandNote('${title}')">View</button>
						<button class="btn btn-primary btn-danger" onclick="deleteNote('${title}')"><i class="bi bi-trash"></i></button>
					</div>
				</div>
			</div>`
		}
	});
}

function deleteNote(title){
	let notes = JSON.parse(localStorage.getItem('notes'));
	
	for (let i = 0; i < notes.length; i++){
		if(notes[i].title == title){
			notes.splice(i, 1);
		}
	}

	localStorage.setItem('notes', JSON.stringify(notes));
	document.querySelector('#notes').innerHTML = '';
	showNotes();
}


function closeNote(){
	document.querySelector('.note-viewer').classList.remove('active');
}

function expandNote(title){
	let notes = JSON.parse(localStorage.getItem('notes'));
	
	for (let i = 0; i < notes.length; i++){
		if(notes[i].title == title){
			let noteExpanded = notes[i];
			let titleExpanded = notes[i].title;
			let descriptionExpanded = notes[i].description;
			let imageExpanded = notes[i].image;
			document.querySelector('.note-viewer').classList.add('active');
			if (imageExpanded.includes("file")) {
			document.querySelector('.note-viewer').innerHTML = 
			`<div class="note-expanded bg-dark">
				<img src="${imageExpanded}">
				<div class="note-details">
					<input value="${titleExpanded}" id="title-expanded" class="form-control mb-4" type="text" name="title" placeholder="Title...">
					<textarea id="description-expanded" class="form-control mb-4">${descriptionExpanded}</textarea>
					<div>
						<button class="btn btn-primary" onclick="editNote()">Save</button>
						<button class="btn btn-secondary" onclick="closeNote()">Cancel</button>
					</div>
				</div>
			</div>`
			}

			else{
			document.querySelector('.note-viewer').innerHTML =
			`<div class="note-expanded bg-dark">
				<div class="color-expanded" style="background-color:${imageExpanded}"></div>
				<div class="note-details">
					<input value="${titleExpanded}" id="title-expanded" class="form-control mb-4" type="text" name="title" placeholder="Title...">
					<textarea id="description-expanded" class="form-control mb-4">${descriptionExpanded}</textarea>
					<div>
						<button class="btn btn-primary" onclick="editNote()">Save</button>
						<button class="btn btn-secondary" onclick="closeNote()">Cancel</button>
					</div>
				</div>
			</div>`
			}

			editNote = () => {
				titleExpanded = document.querySelector("#title-expanded").value;
				descriptionExpanded = document.querySelector("#description-expanded").value;
				noteExpanded.title = titleExpanded;
				noteExpanded.description = descriptionExpanded;
				localStorage.setItem('notes', JSON.stringify(notes));
				document.querySelector('#notes').innerHTML = '';
				showNotes();
				closeNote();
			}

		}
	}
}

showNotes();

imageButton.addEventListener('click', () => imageSelector.classList.add('active'));

// Image Selection

const colorPreview = document.querySelector('.preview-color');

const imagePreview = document.querySelector('#preview-image');

const imageSave = document.querySelector('#image-save');

const imageCancel = document.querySelector('#image-cancel');

const colorOption = document.querySelector('.solid-color');

const colorSelection = document.querySelector('#color-select');

const imagesGroup = document.querySelectorAll('.image-option');

let buttonImage = document.querySelector('#button-image');

let buttonColor = document.querySelector('#button-color');

colorOption.addEventListener('click', () => {
	imagePreview.classList.remove('active');
	colorPreview.classList.add('active');
})

colorSelection.addEventListener('change', ()=> {
	colorOption.style.backgroundColor = colorSelection.value;
	colorPreview.style.backgroundColor = colorSelection.value;
});

imagesGroup.forEach(function(element){
	element.addEventListener('click', () => {
		colorPreview.classList.remove('active');
		imagePreview.classList.add('active');
		imagesGroup.forEach(function(image) {
			image.classList.remove('active');
			element.classList.add('active');
		});
		imagePreview.src = element.src;
	});
});

imageCancel.addEventListener('click', () => imageSelector.classList.remove('active'));

imageSave.addEventListener('click', () => {
	if (colorPreview.classList.contains("active")) {
		buttonImage.classList.remove('selected');
		buttonColor.classList.add('selected');
		buttonColor.style.backgroundColor = colorSelection.value;
	} else{
		buttonColor.classList.remove('selected');
		buttonImage.classList.add('selected');
		buttonImage.src = imagePreview.src;		
	}

	imageSelector.classList.remove('active');
})


