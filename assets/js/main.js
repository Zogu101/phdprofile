// var dropBtn = document.getElementById("dropBtn");
// var myDropdown = document.getElementById("myDropdown");
// var cancleBtn = document.getElementById("cancleBtn");


// // Toggle dropdown open
// function dropdownFunction(){
//     myDropdown.classList.remove("hidden");
//     dropBtn.classList.add("hidden");
//     cancleBtn.classList.remove("hidden");
// };
// // Close dropdown
// function dropdownClose(){
//     myDropdown.classList.add("hidden");
//     dropBtn.classList.remove("hidden");
//     cancleBtn.classList.add("hidden");
// }
// // Event listeners
// dropBtn.addEventListener("click", dropdownFunction);
// cancleBtn.addEventListener("click", dropdownClose);

// // Close the dropdown if the user clicks outside of it
// window.addEventListener("click", function(event){
//     if (!event.target.closest(".dropDown")){
//         closeDropdown();
//     }
// });


// JavaScript - place at bottom of body OR inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const dropBtn = document.getElementById('dropBtn');
  const myDropdown = document.getElementById('myDropdown');
  const cancelBtn = document.getElementById('cancleBtn'); // keeping your spelling
  const wrapper = document.querySelector('.dropDown');

  if (!dropBtn || !myDropdown || !cancelBtn || !wrapper) {
    console.warn('Dropdown script: missing element(s):', { dropBtn, myDropdown, cancelBtn, wrapper });
    return;
  }

  function openDropdown(e) {
    // stopPropagation so the document pointer handler doesn't try to immediately close it
    if (e && e.stopPropagation) e.stopPropagation();
    myDropdown.classList.remove('hidden');
    dropBtn.classList.add('hidden');
    cancelBtn.classList.remove('hidden');
  }

  function closeDropdown() {
    myDropdown.classList.add('hidden');
    dropBtn.classList.remove('hidden');
    cancelBtn.classList.add('hidden');
  }

  // open toggle
  dropBtn.addEventListener('click', openDropdown);

  // cancel button closes
  cancelBtn.addEventListener('click', (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    closeDropdown();
  });

  // close when clicking/tapping a menu item
  myDropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeDropdown()));

  // Close on anywhere outside .dropDown — use pointerdown so taps fire immediately on touch devices
  document.addEventListener('pointerdown', (e) => {
    // debug: uncomment next line to see events in console
    // console.log('pointerdown', e.target);
    // if dropdown already hidden do nothing
    if (myDropdown.classList.contains('hidden')) return;
    // if the pointer event is outside the wrapper, close it
    if (!e.target.closest('.dropDown')) {
      closeDropdown();
    }
  });

  // optional: also handle keyboard Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });
});



//form validation for contact page

// const form = document.getElementById("form");

// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phonePattern = /^\+?\d{10,15}$/; // allows + and 10–15 digits


// // validate form

// form.addEventListener("submit", (e) =>{
//   e.preventDefault();

//   //get input values
//   const name = document.getElementById("name").Value.trim();
//   const phone = document.getElementById("phone").Value.trim();
//   const email = document.getElementById("email").Value.trim();
//   const message = document.getElementById("message").Value.trim();

// })



// ===================== 🌍 COUNTRY / STATE / CITY API HANDLING =====================
const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

// 🟢 Load all countries
async function loadCountries() {
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
    const data = await res.json();

    countrySelect.innerHTML = '<option value="">Select Country</option>';
    data.data.forEach(country => {
      const opt = document.createElement("option");
      opt.value = country.name;
      opt.textContent = country.name;
      countrySelect.appendChild(opt);
    });
  } catch (error) {
    countrySelect.innerHTML = '<option>Error loading countries</option>';
    console.error(error);
  }
}

// 🟡 Load states based on selected country
async function loadStates(country) {
  try {
    stateSelect.innerHTML = '<option>Loading...</option>';
    stateSelect.disabled = true;
    citySelect.innerHTML = '<option>Select state first</option>';
    citySelect.disabled = true;

    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country })
    });

    const data = await res.json();

    if (data.data && data.data.states.length > 0) {
      stateSelect.innerHTML = '<option value="">Select State</option>';
      data.data.states.forEach(state => {
        const opt = document.createElement("option");
        opt.value = state.name;
        opt.textContent = state.name;
        stateSelect.appendChild(opt);
      });
      stateSelect.disabled = false;
    } else {
      stateSelect.innerHTML = '<option>No states found</option>';
    }
  } catch (error) {
    console.error(error);
    stateSelect.innerHTML = '<option>Error loading states</option>';
  }
}

// 🔵 Load cities based on selected country + state
async function loadCities(country, state) {
  try {
    citySelect.innerHTML = '<option>Loading...</option>';
    citySelect.disabled = true;

    const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, state })
    });

    const data = await res.json();

    if (data.data && data.data.length > 0) {
      citySelect.innerHTML = '<option value="">Select City</option>';
      data.data.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
      citySelect.disabled = false;
    } else {
      citySelect.innerHTML = '<option>No cities found</option>';
    }
  } catch (error) {
    console.error(error);
    citySelect.innerHTML = '<option>Error loading cities</option>';
  }
}

// 🧠 Event listeners
countrySelect.addEventListener("change", e => {
  const country = e.target.value;
  if (country) loadStates(country);
});

stateSelect.addEventListener("change", e => {
  const state = e.target.value;
  const country = countrySelect.value;
  if (state) loadCities(country, state);
});

// 🔄 Initialize countries
loadCountries();

// ===================== 🧾 FORM VALIDATION =====================
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, select, textarea');

const namePattern = /^[A-Za-z\s]{3,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field) {
  const errorMsg = field.nextElementSibling;
  let valid = true;
  let message = '';

  switch (field.id) {
    case 'name':
      valid = namePattern.test(field.value.trim());
      message = valid ? '' : 'Name must be at least 3 letters.';
      break;
    case 'email':
      valid = emailPattern.test(field.value.trim());
      message = valid ? '' : 'Enter a valid email address.';
      break;
    case 'country':
    case 'state':
    case 'city':
      valid = field.value.trim() !== '';
      message = valid ? '' : `Select a ${field.id}.`;
      break;
    case 'message':
      valid = field.value.trim().length > 5;
      message = valid ? '' : 'Message should be at least 5 characters.';
      break;
  }

  // Update border & message
  if (!valid) {
    field.classList.add('border-red-500');
    field.classList.remove('border-border');
  } else {
    field.classList.remove('border-red-500');
    field.classList.add('border-border');
  }
  errorMsg.textContent = message;
  return valid;
}

// ===================== ✉️ FORM SUBMIT =====================
form.addEventListener('submit', (e) => {
  e.preventDefault(); // always prevent first
  let allValid = true;

  inputs.forEach(field => {
    if (!validateField(field)) allValid = false;
  });

  if (!allValid) {
    return; // stop if validation fails
  }

  alert('✅ Form submitted successfully!');
  form.reset();
});
