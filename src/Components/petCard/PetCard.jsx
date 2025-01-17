import { Link } from "react-router-dom";

const PetCard = ({item}) => {
    const {imageUrl, name, age, _id} = item;
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={imageUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Link to={`/petDetails/${_id}`}><button className="btn btn-primary bg-[#FF921C]">Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default PetCard;