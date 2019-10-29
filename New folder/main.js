var members = data.results[0].members;
console.log(members);

if (document.getElementById('senate-data')) {
	SenateTable();
}
else if (document.getElementById('house-data')) {
	houseTable();
}

function SenateTable() {

	var a = TableToHTML(filtroSenate(members));

	document.getElementById('senate-data').innerHTML = a;

}



function houseTable() {
	var c = TableToHTML(filtroSenate(members));

	document.getElementById('house-data').innerHTML = c;
}

function TableToHTML(Array) {

	var table = '<thead><tr><th>Full Name</th><th>Party</th><th>State</th><th>seniority</th><th>Percentage of votes with party</th></tr></thead>';

	table += '<tbody>';

	Array.forEach(function (member) {

		table += '<tr>';



		if (member.middle_name === null) {
			table += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</a></td>';

		} else {

			table += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
		}

		table += '<td>' + member.party + '</td>';

		table += '<td>' + member.state + '</td>';

		table += '<td>' + member.seniority + '</td>';

		table += '<td> % ' + member.votes_with_party_pct + '</td>';

		table += '</tr>';

	}
	);


	table += '</tbody>';

	return table;
}



function filtroSenate(array) {

	var checkedBoxes = document.querySelectorAll('input[name=party_filter]:checked');
	checkedBoxes = Array.from(checkedBoxes);
	checkedBoxes = checkedBoxes.map(function (element) { return element.value });


	var selected = document.querySelector('#estado').value;


	var filtrados = [];

	filtrados = array.filter(members => checkedBoxes.includes(members.party))

	if (selected != "") {
		filtrados = filtrados.filter(member => selected.includes(member.state))
		return filtrados;
	} else if (selected == "") {
		return filtrados;
	}
}



var more = 0;
function readmore() {

	if (more == 0) {
		more = 1;
		$('.btn-info').html('read more..');
	} else {
		more = 0;
		$('.btn-info').html('read less..');
	}

}