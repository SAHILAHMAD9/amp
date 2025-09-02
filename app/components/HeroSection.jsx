import react from "react";

export const HeroSection = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-1">
            <div className="">
                <h1>Land Top APM Internships and Full-Time Roles</h1>
                <p className="wrap-anywhere">APM Season is the #1 place to stay up-to-date on the best and latest 2025-2026 associate product manager jobs, internships, and rotational programs at top tech companies.</p>
            </div>
            <div>
                <label>
                <input type="email" placeholder="email"></input>
                </label>
            </div>
        </div>
    )
}