import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
	return (
		<div className="mt-4 flex items-center justify-center">
			<Oval
				height={35}
				width={35}
				color="#10b981"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="#10b981"
				strokeWidth={4}
				strokeWidthSecondary={4}
			/>
		</div>
	);
};

export default Spinner;
