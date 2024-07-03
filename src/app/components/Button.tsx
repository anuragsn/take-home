interface Props {
    onClick?: () => void,
    children: React.ReactNode
}

const Button = ({ onClick, children }: Props) => {
    return (
        <button onClick={onClick} type="submit" className='bg-indigo-600 text-white py-2 px-6 my-10 rounded hover:bg-indigo-600'>
            {children}
        </button>
    )
};

export default Button