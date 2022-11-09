import { Loader } from '../Loader';
import { Fragment, useState } from 'react';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';

export const FinancialInfoCard = () => {
	const [open, setOpen] = useState(1);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	return (
		<section className="financial-info">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Información financiera
						</h1>
						<Fragment>
							<Accordion open={open === 1}>
								<AccordionHeader onClick={() => handleOpen(1)}>
									Recibos de pago
								</AccordionHeader>
								<AccordionBody>
									No cuenta con recibos de pago pendientes para este período.
								</AccordionBody>
							</Accordion>
						</Fragment>
					</div>
				</div>
			</div>
		</section>
	);
};
