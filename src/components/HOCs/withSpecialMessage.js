const withSpecialMessage = () => (Component) => (props) => {
    const specialMessage = 'Talk on Angular Cancelled at 10:30AM';

    return (
        <Component {...props} specialMessage={specialMessage}>
        </Component>
    );
};

export default withSpecialMessage;