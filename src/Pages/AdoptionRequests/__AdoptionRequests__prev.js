import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAdoptionRequests from "../../hooks/useAdoptionRequests";
import useAuth from "../../hooks/useAuth";
import useMyPet from "../../hooks/useMyPet";
import usePet from "../../hooks/usePet";


const AdoptionRequests = () => {
    const [refetch, adoptionRequest] = useAdoptionRequests();
    const { user } = useAuth();
    console.log(adoptionRequest);


    return (
        <section>
            <SectionTitle
            heading={"Adoption Requests"}
            subHeading={"Review and manage adoption applications for your listed pets"}
            ></SectionTitle>
            

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adoptionRequest.map((adopt, index) => <tr className="hover" key={adopt._id}>
                                <th>{index+1}</th>
                                <td>{adopt.userName}</td>
                                <td>{adopt.userEmail}</td>
                                <td>{adopt.phone}</td>
                                <td>{adopt.address}</td>
                                <td><button className="btn btn-ghost">Accept</button></td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default AdoptionRequests;