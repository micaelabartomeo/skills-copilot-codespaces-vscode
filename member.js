function skillsMember() {
  var skills = document.getElementById("skills");
  var skillsMember = document.getElementById("skillsMember");
  var skillsMemberValue = skillsMember.value;
  var skillsMemberValueLength = skillsMemberValue.length;
  var skillsMemberValueLengthMax = skillsMember.getAttribute("maxlength");
  var skillsMemberValueLengthMaxInt = parseInt(skillsMemberValueLengthMax);
  var skillsMemberValueLengthMaxIntMinus = skillsMemberValueLengthMaxInt - skillsMemberValueLength;
  var skillsMemberValueLengthMaxIntMinusString = skillsMemberValueLengthMaxIntMinus.toString();
  skills.innerHTML = skillsMemberValueLengthMaxIntMinusString;
}