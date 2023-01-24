const cross = '<i class="fa-solid fa-x"></i>';
const circle = '<i class="fa-regular fa-circle"></i>';
const placeholder = '<i class="fa-regular fa-circle placeholder"></i>';

var field = document.getElementById("field");
var turn = cross;

document.getElementById("start").addEventListener("click", (e)=>{
	field_size = Number(document.getElementById("field_size").value);
	document.getElementById("menu").style.display="none";
	start_game(Number(document.getElementById("field_size").value));
})

const lock_all = () => {
	for (const row of field.children[0].children) {
		for (const cell of row.children) {
			if (cell.children[0].className.includes("inner_field")) {
				cell.children[0].className = "inner_field";
			}
		}
	}
}

const unlock_all = () => {
	for (const row of field.children[0].children) {
		for (const cell of row.children) {
			if (cell.children[0].className.includes("inner_field")) {
				cell.children[0].className = "inner_field selectable";
			}
		}
	}
}

const unlock = (x,y) => {
	var cell = field.children[0].children[y].children[x].children[0];
	if (cell.className.includes("inner_field")) {
		cell.className = "inner_field selectable";
	} else {
		unlock_all()
	}
}

const check_for_line = (inner_field) => {
	var cells = inner_field.children[0].children
	var is_line_founded = false

	//rows
	for (var y=0; y<field_size; y++) {
		var row = cells[y];
		var symbol = row.children[0].children[0].className
		if (symbol!="fa-regular fa-circle placeholder") {
			var is_row_founded = true	
			for (var x=1; x<field_size; x++) {
				if (row.children[x].children[0].className!=symbol) {
					is_row_founded = false;
					break;
				}
			}
			if (is_row_founded) {
				is_line_founded = true
				break;
			}
		}
	}

	//columns
	for (var x=0; x<field_size; x++) {
		var symbol = cells[0].children[x].children[0].className
		if (symbol!="fa-regular fa-circle placeholder") {
			var is_column_founded = true	
			for (var y=1; y<field_size; y++) {
				if (cells[y].children[x].children[0].className!=symbol) {
					is_column_founded = false;
					break;
				}
			}
			if (is_column_founded) {
				is_line_founded = true
				break;
			}
		}
	}

	//diagonals
	for (var side=0; side<2; side++) {
		var cef = (field_size-1)*side
		var symbol = cells[0].children[cef].children[0].className
		if (symbol!="fa-regular fa-circle placeholder") {
			var is_diagonal_founded = true	
			for (var y=1; y<field_size; y++) {
				if (cells[y].children[Math.abs(cef-y)].children[0].className!=symbol) {
					is_diagonal_founded = false;
					break;
				}
			}
			if (is_diagonal_founded) {
				is_line_founded = true
				break;
			}
		}
	}

	if (is_line_founded) {
		inner_field.parentNode.innerHTML = turn;
	}
}

const make_a_move = (e) => {
	var cell = e.attributes;
	var inner_field = e.parentNode.parentNode.parentNode;
	if (inner_field.className=="inner_field selectable" && e.children[0].className=="fa-regular fa-circle placeholder") {
		lock_all();
		e.innerHTML = turn;
		check_for_line(inner_field);
		unlock(cell.column.nodeValue,cell.row.nodeValue);
		if (turn==cross) {turn=circle} else {turn=cross}
	}
}

const start_game = (field_size) => {
	var inner_field = '<table class="inner_field selectable">';
	for (var y=0; y<field_size; y++) {
		inner_field+="<tr>";
		for (var x=0; x<field_size; x++) {
			inner_field+=`<td class="no-padding" row=${y} column=${x} onClick="make_a_move(this)">${placeholder}</td>`;
		}
		inner_field+="</tr>"
	}
	inner_field+="</table>"

	var table = "";
	for (var y=0; y<field_size; y++) {
		table+="<tr>";
		for (var x=0; x<field_size; x++) {
			table+=`<td row=${y} column=${x}>`+inner_field+"</td>";
		}
		table+="</tr>"
	}

	field.innerHTML=table;

	is_any_selectable = true;
	turn = cross;

	document.getElementById("game").style.display="block";
}

