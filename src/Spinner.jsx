import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
	return (
		<div className="mt-4 flex items-center justify-center">
			<Oval
				height={40}
				width={40}
				color="#10b981"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="#10b981"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</div>
	);
};

export default Spinner;
