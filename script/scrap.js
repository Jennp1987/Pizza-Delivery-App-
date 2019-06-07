var addressType, addressInputElement, label, otherAddress;

if ( /*select.options[select.selectedIndex]addressType.value */ document.getElementById('addressType').value === 'other') {
        //CREATING INPUT DYNAMICALLY
        addressInputElement = document.createElement('input');
        //CREATE LABELS
        label = document.createElement('label');
        label.innerHTML = "What type of address?";
        //ASSIGN DIFFERENT ATTRIBUTES TO ELEMENT
        addressInputElement.setAttribute("type", "text");
        addressInputElement.setAttribute("value", "other address");
        addressInputElement.setAttribute("name", "Other Address");
        //ADD IN STYLES
        addressInputElement.setAttribute("style", "width: 200px");
        label.setAttribute("style", "font-weight:normal");

        //ID OF ELEMENT WHERE NEW INPUT SHOULD BE ADDED
        otherAddress = $('otherAddress');

        //APPEND ELEMENT TO PAGE IN SPAN?
        otherAddress.appendChild(label);
        otherAddress.appendChild(addressInputElement);
        return otherAddress;
    }