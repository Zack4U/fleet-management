import React from "react";
import { Result, Button } from "antd";

const PageNotFoundComponent = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" href="/home">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default PageNotFoundComponent;
