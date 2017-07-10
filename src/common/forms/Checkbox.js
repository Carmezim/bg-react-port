import React from "react";
import { Field } from "redux-form";

const Checkbox = props => {
	const { validate } = props;

	return (
		<div className="pre-order-checkbox">
			<label className="form-label" htmlFor="order-title">
				Book Title
			</label>
			<Field
				name="orderTitle"
				type="text"
				id="order-title"
				className="order-title"
				component="input"
				validate={validate}
			/>
			<label className="form-label" htmlFor="order-summary">
				Book Summary
			</label>
			<Field
				name="orderSummary"
				type="text"
				id="order-summary"
				className="order-summary"
				component="input"
				validate={validate}
			/>
			<label className="form-label" htmlFor="order-ISBN">
				ISBN Number
			</label>
			<Field
				name="orderISBN"
				type="number"
				id="order-ISBN"
				className="order-ISBN"
				component="input"
				validate={validate}
			/>
			<label className="form-label" htmlFor="order-price">
				Price
			</label>
			<Field
				name="orderPrice"
				type="number"
				id="order-price"
				className="order-price"
				component="input"
				validate={validate}
			/>
			<label className="form-label" htmlFor="order-discount">
				Book Discount
			</label>
			<Field
				name="orderDiscount"
				type="number"
				id="order-discount"
				className="order-discount"
				component="input"
				validate={validate}
			/>
		</div>
	);
};

export default Checkbox;
