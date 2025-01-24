import sectionLogo from "../../assets/logo (1).png";

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center py-8">
            {/* Icon and Heading */}
            <div className="flex justify-center items-center space-x-2">
                {/* Icon */}
                <div>
                    <img
                        src={sectionLogo}
                        alt="Section Logo"
                        className="h-10 w-10 object-contain"
                    />
                </div>
                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">
                    {heading}
                </h2>
            </div>

            {/* Horizontal Line */}
            <div className="flex justify-center items-center mt-2">
                <hr className="border-t-2 border-gray-300 dark:border-gray-600 w-1/3" />
            </div>

            {/* Subheading */}
            <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                {subHeading}
            </p>
        </div>
    );
};

export default SectionTitle;
