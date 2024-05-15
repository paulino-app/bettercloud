import React from "react";

/**
 * GroupSkeleton component to display a loading skeleton for groups.
 * @returns {JSX.Element} The GroupSkeleton component.
 */
export function GroupSkeleton(): JSX.Element {
  return (
    <div className="skeleton-loader w-full">
      <div className="skeleton-box h-[102px] w-full" />
    </div>
  );
}

/**
 * IconSkeleton component to display a loading skeleton for icons.
 * @returns {JSX.Element} The IconSkeleton component.
 */
export function IconSkeleton(): JSX.Element {
  return (
    <div className="skeleton-loader h-[200px] rounded-[14px]">
      <div className="skeleton-box h-[200px] w-full" />
    </div>
  );
}

/**
 * RowSkeleton component to display a loading skeleton for tables.
 * @returns {JSX.Element} The RowSkeleton component.
 */
export function RowSkeleton(): JSX.Element {
  return (
    <div className="skeleton-loader mb-2 h-[32px] rounded-[14px]">
      <div className="skeleton-box h-[32px] w-full" />
    </div>
  );
}
