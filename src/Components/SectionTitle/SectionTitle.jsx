import sectionLogo from "../../assets/logo (1).png"

const SectionTitle = ({ heading, subHeading }) => {
    return (
        // <div className="md: w-4/12 mx-auto my-8 text-center">
        //     <p className="text-4xl uppercase border-y-4 py-4 ">{heading}</p>
        //     <p className="text-yellow-600  mb-2">---{subHeading}---</p>
        // </div>
        <div className="text-center my-8">
            <div className="flex justify-center items-center space-x-2">
                {/* Icon */}
                <div>
                    <img src={sectionLogo} alt="" />
                </div>
                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                    {heading}
                </h2>

            </div>


            {/* Horizontal Line */}
            <div className="flex justify-center items-center mt-2">
                <hr className="border-t-2 border-gray-300 w-1/3" />
            </div>

            {/* Subheading */}
            <p className="text-gray-600 text-lg">
                {subHeading}
            </p>
        </div>

    );
};

export default SectionTitle;