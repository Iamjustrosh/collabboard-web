import { MDXProvider } from "@mdx-js/react";

const components = {
  h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  p:  (props) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
  code: (props) => (
    <code className="px-1 py-0.5 bg-gray-200 rounded text-sm" {...props} />
  ),
};

export default function MDXWrapper({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
