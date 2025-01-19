<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>{`Support ${name} with a Donation`}</h2>
                <form onSubmit={handleFormSubmit}>
                    {/* Donation Amount */}
                    <div>
                        <label>Donation Amount</label>
                        <input
                            type="number"
                            name="donationAmount"
                            value={formData.donationAmount}
                            onChange={handleInputChange}
                            required
                            min="1"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Stripe Credit Card Element */}
                    <div>
                        <label>Credit Card Information</label>
                        <div id="card-element">
                            {/* The Stripe Element will be inserted here */}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            Donate Now
                        </button>
                    </div>
                </form>
            </Modal>