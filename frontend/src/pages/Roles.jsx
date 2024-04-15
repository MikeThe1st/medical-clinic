import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TableForRoles from "../components/TableForRoles";
import Footer from "../components/Footer";
import axios from "axios";

const Roles = () => {
	return (
		<div>
			<Navbar />
		    <TableForRoles/>
		
		</div>
	);
};

export default Roles;