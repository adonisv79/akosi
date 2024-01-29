import { ALVSection } from '../basic/alv-section';

export const AkosiLoginDialog = () => {
  return (
    <ALVSection
      id="akosi-login-container"
      className="bg-white p-8 rounded-md shadow-md"
      displayType="grid"
    >
      {/* Your login form content */}
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Log in
        </button>
      </form>
    </ALVSection>
  );
};
