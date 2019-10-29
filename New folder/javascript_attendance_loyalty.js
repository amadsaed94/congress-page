const member = data.results[0].members;
var statics = {
  "number-of-democrats": 0,
  "number-of-republicans": 0,
  "number-of-indpendents": 0,
  "total": 0,
  "democrats-average-votes-with-party": 0,
  "republicans-average-votes-with-party": 0,
  "independents-average-votes-with-party": 0,
  "total-average": 0,
  "least-engaged": [],
  "most-engaged": [],
  "least-loyal": [],
  "most-loyal": [],
};

var democrats, independents, republicans;
democrats = member.filter(m => m.party === 'D');
independents = member.filter(m => m.party === 'I');
republicans = member.filter(m => m.party === 'R');

statics["number-of-democrats"] = democrats.length;
statics["number-of-independents"] = independents.length;
statics["number-of-republicans"] = republicans.length;
statics["total"] = member.length;


function average(membersOfParty) {
  if (membersOfParty.length > 0) {
    var sumatoria = membersOfParty
      .map(m => m.votes_with_party_pct)
      .reduce((n1, n2) => n1 + n2);
    return sumatoria / membersOfParty.length;
  }
  return 0;
}

statics["democrats-average-votes-with-party"] = Math.round(average(democrats));
statics["republicans-average-votes-with-party"] = Math.round(average(republicans));
statics["independents-average-votes-with-party"] = Math.round(average(independents));
statics["total-average"] = Math.round((average(democrats) + average(independents) + average(republicans)) / 3);


function identifyTheMembers(key, otherFunction) {

  var limit = Math.round(member.length * 0.1) - 1;
  member.sort(otherFunction);
  var limitValue = member[limit][key];

  var sorted = [];

  if (limitValue >= member[0][key]) {
    sorted = member.filter(m => m[key] <= limitValue);
  }
  else {
    sorted = member.filter(m => m[key] >= limitValue);
  }

  return sorted;
}


statics["least-engaged"] = identifyTheMembers("missed_votes_pct", (m1, m2) => m2.missed_votes_pct - m1.missed_votes_pct);

statics["most-engaged"] = identifyTheMembers("missed_votes_pct", (m1, m2) => m1.missed_votes_pct - m2.missed_votes_pct);

statics["least-loyal"] = identifyTheMembers("votes_with_party_pct", (m1, m2) => m1.votes_with_party_pct - m2.votes_with_party_pct);

statics["most-loyal"] = identifyTheMembers("votes_with_party_pct", (m1, m2) => m2.votes_with_party_pct - m1.votes_with_party_pct);





function writeTableEngaged(idBody, memberList) {
  var element = document.getElementById(idBody);
  var text = "";

  memberList.forEach(function (x) {
    text += "<tr><td>" + x.first_name + " " + x.last_name + "</td><td>" + x.missed_votes + "</td><td>" + x.missed_votes_pct + "</td></tr>"
  })

  element.innerHTML = text;
}

function writeTableLoyal(idBody, memberList) {
  var element = document.getElementById(idBody);
  var texto = "";

  memberList.forEach(function (x) {
    texto += "<tr><td>" + x.first_name + " " + x.last_name + "</td><td>" + Math.round(x.total_votes * x.votes_with_party_pct / 100) + "</td><td>" + x.votes_with_party_pct + "</td></tr>"
  })

  element.innerHTML = texto;
}

var parties = [{
  party: "Democrats",
  number_of_representatives: statics["number-of-democrats"],
  pct_vwp: statics["democrats-average-votes-with-party"],
},
{
  party: "Republicans",
  number_of_representatives: statics["number-of-republicans"],
  pct_vwp: statics["republicans-average-votes-with-party"],
},
{
  party: "Independents",
  number_of_representatives: statics["number-of-independents"],
  pct_vwp: statics["republicans-average-votes-with-party"],
},
{
  party: "Total",
  number_of_representatives: statics["total"],
  pct_vwp: statics["total-average"],
}

]

function creatGlance() {
  var element = document.getElementById("glance");
  var texto = "";
  parties.forEach(function (x) {
    texto += "<tr><td>" + x.party + "</td><td>" + x.number_of_representatives + "</td><td>" + x.pct_vwp + "</td></tr>"
  })
  element.innerHTML = texto;

}

creatGlance();

var leastEngaged = statics["least-engaged"];
var mostEngaged = statics["most-engaged"];
var leastLoyal = statics["least-loyal"];
var mostLoyal = statics["most-loyal"];

