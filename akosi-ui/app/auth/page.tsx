import ALVButton from "../_components/basic/button";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <>
  <h1>Hello, Home page!</h1>
  <ALVButton size='sm' >ssad</ALVButton>
  <ALVButton>ssad</ALVButton>
  <ALVButton size='lg' >ssad</ALVButton>
  <br />
  <ALVButton theme="dark" size='sm' >ssad</ALVButton>
  <ALVButton theme="dark">ssad</ALVButton>
  <ALVButton theme="dark" size='lg' >ssad</ALVButton>
  </>
}