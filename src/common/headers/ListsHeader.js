import React from "react";

import "./ListsHeader.css";

const ListHeader = props => {
	return (
		<div className="container">
			<div className="container-inner">
				<div className="panel-body panel-titles">
					<div className="panel-content">
						<div className="pan-col col-same pan-author-title"><p>Author Name</p></div>
						<div className="pan-col col-same pan-event-title"><p>Event Title</p></div>
						<div className="pan-col pan-date"><p>Start Date</p></div>
						<div className="pan-col col-same pan-price"><p>Price</p></div>
						<div className="pan-col col-same pan-age"><p>Ages</p></div>
						<div className="pan-col col-same pan-order"><p>Pre-order</p></div>
						<div className="pan-col col-same"><p>Start Time</p></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListHeader;
