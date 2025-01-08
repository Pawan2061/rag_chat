import { Book, GlobeLock, Network } from "lucide-react";

const features = [
  {
    name: "Complete Forms Easily.",
    description:
      "We have built chatbot  to help you understand the forms better.",
    icon: Network,
  },
  {
    name: "Context Based Answer.",
    description: "We help you with relivant data to fill in places you need",
    icon: Book,
  },
  {
    name: "Privacy Friendly.",
    description: "Your chats are secured by us. No need to worry",
    icon: GlobeLock,
  },
];

export const Features = () => {
  return (
    <div className=" py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7  text-black  dark:text-white p-4">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white  sm:text-4xl">
            No proper guidance while filling out forms? No problem.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            We help you autocomplete forms in a structured way. Just place your
            input and everything is on us
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-M_r7bEyuBQzUODeKwobumjZ2bnoB_uelw&s"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 dark:text-white sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative pl-9 text-gray-600 dark:text-white"
            >
              <dt className="inline font-semibold text-gray-900 dark:text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-gray-600 dark:text-white"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
