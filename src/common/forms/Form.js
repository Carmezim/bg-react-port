import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

// Generic form component using Redux Form (in progress, can be extended to generate form groups)
// Usage:
// Provide the arguments as the example below
// and pass them to the Form component props when invoking
// in your React component
//
//  const myForm = "YAY Form Generator";
// 	const options = [
// 	{
// 		label: {
// 			class: "label-test",
// 			for: "for-test",
// 			title: "generic form generator"
// 		},
// 		name: "generic-form",
// 		type: "text",
// 		id: "test",
// 		class: "test-form",
// 		component: "input",
// 		validate: nameRequired
// 	}
// ];
//
// class YourAwesomeComponent extends Component {
// 	<Form options={options} formName={myForm} />
// }

const Form = ({ options, formName }) =>
	<div className={formName}>
		{options.map((option, index) => 
			<div className="" key={index}>
				<label className={option.label.class} htmlFor={option.label.for}>
					{option.label.title}
				</label>
				<Field
					name={option.name}
					type={option.type}
					id={option.id}
					className={option.class}
					component={option.component}
					validate={option.validate}
				/>
			</div>
		)}
	</div>;

Form.prototypes = {
	formName: PropTypes.string.isRequired,
	options: PropTypes.shape([
		{
			label: PropTypes.shape({
				class: PropTypes.string.isRequired,
				for: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired
			}).isRequired,
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			class: PropTypes.string.id,
			component: PropTypes.oneOfType([
				PropTypes.element,
				PropTypes.func,
				PropTypes.string
			])
		}
	])
};

export default Form;
