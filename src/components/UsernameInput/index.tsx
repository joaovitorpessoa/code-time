import { Field, Formik, FormikValues, Form } from "formik";

import "./styles.css";

interface Props {
  setParentUsername: (username: string) => void;
}

function UsernameInput({ setParentUsername }: Props) {
  function handleFormSubmit(formFields: FormikValues) {
    const { username } = formFields;
    setParentUsername(username);
  }

  return (
    <Formik initialValues={{ username: "" }} onSubmit={handleFormSubmit}>
      <Form>
        <Field name={"username"} autocomplete={"off"} />
      </Form>
    </Formik>
  );
}

export default UsernameInput;
