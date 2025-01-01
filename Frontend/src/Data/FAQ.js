import { FaCar } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
export const options=[
    {id:1,
        title:"Trust, Safety and Transparency",
        description:"We ensure your safety and security, and we make sure you feel comfortable and safe while renting."
    },
    {
        id:2,
        title:"Book, Check, and Pay",
        description:"We provide you with the tools to book your car, check your booking, and pay for your rental."
    },
    {
        id:3,
        title:"Flexible and Customizable",
        description:"We offer you a wide range of car options, so you can choose the perfect car for your needs."
    }
]

export const locations=[
    {
        id:1,
        city: "Okara ➡ Lahore",
    },
    {
        id:2,
        city: "Islamabad ➡ Lahore",
    },
    {
        id:3,
        city: "Sahiwal ➡ Lahore",
    },
    {
        id:4,
        city: "Rawalpindi ➡ Lahore",
    }

]
export const FAQs=[{
    id:1,
    question:"How do I book a car?",
    answer:"You can book your car by visiting our website, calling our customer care team, or using our app. We will guide you through the process."
},
{
    id:2,
    question:"What are the different types of cars available?",
    answer:"We have a variety of cars available, including sedans, SUVs, and luxury vehicles. Each car comes with its own features and benefits."
},
{
    id:3,
    question:"What are the payment options available?",
    answer:"We accept a variety of payment options, including online, and cash on delivery."
},
{
    id:4,
    question:"Can I cancel my booking?",
    answer:"Yes, you can cancel your booking at any time. Please contact our customer care team to make the necessary changes."
},
{
    id:5,
    question:"What are the terms and conditions for booking a car?",
    answer:"Please review the terms and conditions carefully before booking a car. We will make sure to adhere to all applicable laws and regulations."
},{
    id:6,
    question:"How long will my car stay rented?",
    answer:"Your car will be rented for the specified duration, which is usually 24 hours. Please make sure to book your car in advance to avoid any unexpected delays."
}
]
export const selects=[
    { title:"Vehicle Type", icon: FaCar, options: ["Select Car", "Suv", "Sedan","Luxery","Coupe"]},
    { title:"Pickup Location", icon: FaLocationDot , options: ["Select Location", "Sahiwal","Lahore", "Islamabad","Okara"],
    },
    { title:"Picking Up Date", }   ,

    { title:"Returning Date",  } 
];