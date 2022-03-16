import App from "./app";
import { render, waitFor } from "@testing-library/react";

test("app eventually renders a div", async () => {
    fetch.mockResolvedValue({
        async json() {
            return({
                first:"Merle",
                last:"Silva",
                profile_pic: "www.someurl.com",
                user_id: 1,
            });
        }
    });
});

const test = render(<App/>);
console.log(`container.innerHTML`, container.innerHTML);