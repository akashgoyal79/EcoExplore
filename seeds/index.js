const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log("Connection Sucessfull")
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<200; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '65e33fd131b79bbbca6be023',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi inventore iste nesciunt sed, doloremque minima sint esse voluptatibus, perspiciatis illo ab nihil qui animi sunt vel aliquam, tempora nemo adipisci!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dxzprd8cs/image/upload/v1709690100/YelpCamp/uuvylryutltjaj45dgat.jpg',
                    filename: 'YelpCamp/uuvylryutltjaj45dgat'
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }
        })
    await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});