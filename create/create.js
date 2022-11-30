import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const formData = new FormData(form);
    // use createBunny to create a bunny with this name and family id
    const familyId = formData.get('family-id');
    const name = formData.get('bunny-name');

    await createBunny({
        name: name,
        family_id: familyId,
    });
    location.replace('../families');
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const select = document.querySelector('select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
        // create an option tag
        const option = document.createElement('option');
        // set the option's value and text content
        option.value = family.id;
        option.textContent = family.name;
        // and append the option to the select
        select.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
