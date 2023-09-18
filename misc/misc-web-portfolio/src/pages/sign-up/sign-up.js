
pwRequirements = [
  { id: "pwLength", regexp: ".{8,}$" },
  { id: "uppLetter", regexp: ".*[A-Z].*" },
  { id: "lowLetter", regexp: ".*[a-z].*" },
  { id: "pwNum", regexp: ".*[0-9].*" }]

window.onload = () => {
  updateTags();
}

updateTags = () => {
  pw = document.getElementById("usrPassword").value;
  pwRequirements.forEach(req => {
    elem = document.getElementById(req.id)
    regexp = new RegExp(req.regexp);
    elem.className = ""
    classTag = regexp.test(pw) ? "valid" : "invalid";
    document.getElementById(req.id).classList.add(classTag, "tag", "padd-0");
  });
}

isFormValid = () => {
  pw = document.getElementById("usrPassword").value;

  for (let index = 0; index < pwRequirements.length; index++) {
    const req = pwRequirements[index];
    elem = document.getElementById(req.id);
    regexp = new RegExp(req.regexp);
    if (!regexp.test(pw)) {
      return false;
    }
  }
  return true;
}

createAccount = () => {
  pw = document.getElementById("usrPassword").value;
  pwConfirm = document.getElementById("usrPasswordConfirm").value;

  if (!isFormValid() || pw !== pwConfirm) {
    return false;
  }

  location.reload();
}
