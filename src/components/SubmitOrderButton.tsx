import React from 'react';

type SubmitOrderButtonProps = {
    onSubmit: () => void;
};

const SubmitOrderButton: React.FC<SubmitOrderButtonProps> = ({ onSubmit }) => (
    <button onClick={onSubmit}>Отправить заказ на кухню</button>
);

export default SubmitOrderButton;
