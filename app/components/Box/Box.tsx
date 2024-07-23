import styles from "./Box.module.css";

const Box: React.FC<React.ComponentPropsWithRef<"div">> = ({
  children,
  className,
  ...props
}) => {
  // Implement the logic for your Box component here

  return (
    <div
      {...props}
      className={[styles.box, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
};

export default Box;
