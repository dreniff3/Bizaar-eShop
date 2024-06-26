import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const { keyword: urlKeyword } = useParams();

    const [keyword, setKeyword] = useState(urlKeyword || '');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Products'
                id='search-box'
                className='mr-sm-2 ml-sm-5 bg-light'
                style={{}}
            ></Form.Control>
            <Button
                type='submit'
                className='p-2 mx-2'
            >Search</Button>
        </Form>
    );
};

export default SearchBox;