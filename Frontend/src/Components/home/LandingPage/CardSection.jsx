import React from "react";
import Card from "./Card";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
function CardSection() {
  return (
    <>
      <section>
        <div className="flex items-center justify-center  h-[40vh]">
          <div className="flex flex-col items-center max-w-2xl mx-auto text-center px-7 h-1/2">
            <h1 className="text-2xl font-bold ">
              How It <span className="text-yellow-300">Works</span>
            </h1>
            <p className="mt-4 font-serif">
              <q>
                Our platform is designed to make it easy for you to find and
                book a ride service in affordable price. You can browse all of
                our cars for rent, check availability on your desired date, and
                if available, book with a single click.
              </q>
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-6 mb-12 max-md:flex-col max-md:mx-11">
          <Card
            image={<GiTakeMyMoney size={40} />}
            title={"Your pick of rides at low price"}
            description={
              "No matter where you're going by car,find the perfect ride from our wide range of destinations and routes at low rates."
            }
          />
          <Card
            image={<FaCar size={40} />}
            title={"Trust who you travel with"}
            description={
              "We take the time to get to know each of our members and car partners.we check review, so you know who you're travelling with and can book."
            }
          />
          <Card
            image={<SlEnergy size={40} />}
            title={"Scroll,Click,Tap and Go!"}
            description={
              "Booking a ride has never been easier! Thanks to our simple app powered by great techology.you can book a ride close to you in just minutes."
            }
          />
        </div>
      </section>
    </>
  );
}

export default CardSection;
