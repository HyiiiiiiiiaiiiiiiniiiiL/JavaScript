const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
const storyText = "It was 94 fahrenheit outside, " +
    "so :insertx: went for a walk. When they got to :inserty:," +
    "they stared in horror for a few moments, then :insertz:." +
    "Bob saw the whole thing, but was not surprised — :insertx:" +
    "weighs 300 pounds, and it was a hot day."
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"]
const insertY = ["the soup kitchen", "Disneyland", "the White House"]
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"]


randomize.addEventListener('click', result);

function result() {

    if (customName.value !== '') {
        var name = customName.value;

    }

    if (document.getElementById("cn").checked) {
        var weight = Math.round(300);
        var temperature = Math.round(94);
    }
    const insertx = randomValueFromArray(insertX)
    const inserty = randomValueFromArray(insertY)
    const insertz = randomValueFromArray(insertZ)

    story.textContent = `It was 94 fahrenheit outside, ` +
        `so ${insertx} went for a walk. When they got to ${inserty},` +
        `they stared in horror for a few moments, then ${insertz}` +
        `Bob saw the whole thing, but was not surprised — ${insertx}` +
        `weighs 300 pounds, and it was a hot day.`
    story.style.visibility = 'visible';
}