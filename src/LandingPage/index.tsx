import React from "react";
import Header from "../Header";
const ranges = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/3740/8e44/4bdba3a6bef9d68df2d9a06e32e96c61?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RPVF5qS1vV5dFrcBNlprjXYJO5dStvWmtRCy-sMIZJahGSffuv7jlzarELDg882zVcrGPJwq-xa52RU34IOWiK4AqcvMVErxYyvh5yhvmHAXC5R1b274IDnRMReHQAKQBxH-Y9j5aLJaRIf2n3UWdFlI2RPxDv1hWa9MtHJnXNJY8FM6V2LcrvDT3CKFJpVS70YlXJ4sqG7p33IXMClLIC4RTxk1YduS0QHkUD9UJTdFzNDEDl0a7j23vFNO6-qnaIjP3yO73j0VzUhgoO53Na2LRhh7gsJqvk6wz9-fZ9dnGrMTBAKZJxFsYGp7BQRA6N7a0DiIMCJdFR-fKY4mnw__",
    title: "Dining",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/b7e3/92a7/f3961ca2b1edab00f7a7640b3c2ed666?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=euWSWMqEaI3RmC1xK8Gh0FeqV9lDYFKIdRsMXNbrNLZ1fhKPrSxu~RORCtNzokEVec-mHEMVhEkJbesrf7bAYVTPP5gYQrllGg~9Gv1XvN5gE6r1jnxb2xRW1fDJ1MSYXSuIX~44ElSkHTyg~QsLxedoM1Jh9EO1Ame7yy-MQFs8x2TjY3fEkJZ9FDFIHxwCsDfSVun5ICQPxwk5fBBS7pi2-UFdx7c1twiHaWYWQl3QjxQjTBHTCvFUSyXBGz87-elKJ4zBPVIvRXWBsrqPhWpDhwFCOyOR5-H66R7v5GwQ2AwYYB5W24iyMy54HOxPZF7fWMOqnd2qtIUAEwAr5Q__",
    title: "Living",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/77e4/946e/ec6e291e21c9694ce22e6c5b50d777fe?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TFhLAh5nugMcseZF~BzWdHelxuOVMqFB5hlWCD3aFdygZ5eyHTuqLXT7t~xwx1~iPtlktmg1stOhUi6Fuda-riarub3OBXATyhpL4hxXjRT3oX6fGTwJI7MHrpiIdK-bGbxWP6DYc6H4a2yoGW6~P2GpWPvXEvLLOXlM0cEreVQbJm8I9KHSQwISsxyTws4214uT83MPzoIW1BH8bSn8zU6FPZnUbpHybK17WTqqGV4qAfsPTJPBvZgs~u6JI8c4BqUVzJF7bL6x76y4h4VFUN4FF5nVGWte3HWnEOS-elirllqR5jhkrES2nbAS1fmK8mLL1Q-rTWHG~LnUzy1Zmw__",
    title: "Bedroom",
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        style={{
          backgroundImage:
            "url('https://s3-alpha-sig.figma.com/img/98fb/219f/a11f805aade2224f1d6658764a2395df?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KHtx-QJHDccE65LCTqbdkNj7hiWDFi9~cVSUpP-x39JBuScLm03g2iPhTReIAbjc2GDOgVp8W2MW99d5~CyOB7Q8J8lPohb~2RA1Zey5YLhGlZY6c6wu0yaso5tLS5o~zadurv3PMOMm98L5b06algMQkRYqzHccIPfYPydSWsZB7eoZIW6vG5aWoEyMkm7y6qlOnweq5girg~2RqxvNwm0VrypZe1e9BUf4pOrYo~CUKNxEXCdlzBl0S0Z056WBdSdubpoZkIhoFDubVJIpGMTlDSjqeGUVEC8LhXkpxdyVccEGRaGKW~OX8RyA~2CPrkrcTon1KN6VQAmasiyHXg__')",
        }}
        className="lg:h-screen h-[70vh] w-screen relative bg-cover bg-center flex justify-end"
      >
        <div className="lg:w-[500px] w-11/12 bg-[#FFF3E3] flex flex-col gap-5 absolute right-5 lg:right-10 top-40 lg:top-52 py-14 rounded-[10px] px-7">
          <div className="flex flex-col">
            <p className="tracking-wider">New Arrival</p>
            <p className="lg:text-[52px] text-3xl text-[#B88E2F] font-[700]">
              Discover Our New Collection
            </p>
          </div>
          <p className="text-sm font-[900]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="lg:p-4 p-3 bg-[#B88E2F] w-40 text-white">
            BUY NOW
          </button>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-10">
        <div className="flex flex-col items-center justify-center ">
          <p className="font-bold text-3xl">Browse The Range</p>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 lg:gap-2 place-items-center">
          {ranges?.map((i, index) => {
            return (
              <div key={index} className="flex flex-col gap-5">
                <img
                  src={i.image}
                  alt=""
                  className="h-[480px] w-[381px] object-cover rounded-lg"
                />
                <p className="text-center text-[24] font-[600]">{i.title}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          <p className="text-4xl font-bold text-center">Our Products</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
