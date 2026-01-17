import mongoose from "mongoose";
import dotenv from "dotenv";
import Internship from "../models/internship.model";

dotenv.config();

const internships = [
  {
    title: "Software Development Engineer Intern",
    companyName: "Amazon",
    jobId: "2567890",
    applyType: "EXTERNAL",
    applyLink: "https://www.amazon.jobs/en/jobs/2567890",
    description: "SDE Internship at Amazon",
  },
  {
    title: "Software Engineering Intern",
    companyName: "Google",
    jobId: "GGL-SWE-INT-2025",
    applyType: "EXTERNAL",
    applyLink: "https://careers.google.com/jobs/results/",
    description: "Software Engineering Internship at Google",
  },
  {
    title: "Software Engineer Intern",
    companyName: "Microsoft",
    jobId: "MSFT-INT-1023",
    applyType: "EXTERNAL",
    applyLink: "https://jobs.careers.microsoft.com/global/en/search",
    description: "Software Engineer Internship at Microsoft",
  },
  {
    title: "Frontend Engineer Intern",
    companyName: "Meta",
    jobId: "META-FE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://www.metacareers.com/jobs/",
    description: "Frontend Engineering Internship at Meta",
  },
  {
    title: "Backend Engineer Intern",
    companyName: "Netflix",
    jobId: "NFLX-BE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://jobs.netflix.com/",
    description: "Backend Engineering Internship at Netflix",
  },
  {
    title: "Software Engineering Intern",
    companyName: "Uber",
    jobId: "UBER-SWE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://www.uber.com/us/en/careers/list/",
    description: "SWE Internship at Uber",
  },
  {
    title: "Platform Engineer Intern",
    companyName: "Airbnb",
    jobId: "AIRBNB-PLT-INT",
    applyType: "EXTERNAL",
    applyLink: "https://careers.airbnb.com/positions/",
    description: "Platform Engineering Internship at Airbnb",
  },
  {
    title: "Software Engineer Intern",
    companyName: "Atlassian",
    jobId: "ATL-SWE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://www.atlassian.com/company/careers/all-jobs",
    description: "Software Engineering Internship at Atlassian",
  },
  {
    title: "Full Stack Developer Intern",
    companyName: "Adobe",
    jobId: "ADB-FS-INT",
    applyType: "EXTERNAL",
    applyLink: "https://careers.adobe.com/us/en/search-results",
    description: "Full Stack Internship at Adobe",
  },
  {
    title: "Cloud Engineer Intern",
    companyName: "Salesforce",
    jobId: "SF-CLD-INT",
    applyType: "EXTERNAL",
    applyLink: "https://careers.salesforce.com/en/jobs/",
    description: "Cloud Engineering Internship at Salesforce",
  },
  {
    title: "Software Engineer Intern",
    companyName: "LinkedIn",
    jobId: "LI-SWE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://www.linkedin.com/jobs/search/?keywords=intern",
    description: "Software Engineering Internship at LinkedIn",
  },
  {
    title: "Mobile Engineer Intern",
    companyName: "Spotify",
    jobId: "SPOT-MOB-INT",
    applyType: "EXTERNAL",
    applyLink: "https://www.lifeatspotify.com/jobs",
    description: "Mobile Engineering Internship at Spotify",
  },
  {
    title: "Data Engineer Intern",
    companyName: "Stripe",
    jobId: "STRIPE-DE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://stripe.com/jobs/search",
    description: "Data Engineering Internship at Stripe",
  },
  {
    title: "Software Engineer Intern",
    companyName: "Twitter (X)",
    jobId: "X-SWE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://careers.x.com/en",
    description: "Software Engineering Internship at X",
  },
  {
    title: "Backend Developer Intern",
    companyName: "PayPal",
    jobId: "PYPL-BE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://jobsearch.paypal-corp.com/en-US/search",
    description: "Backend Internship at PayPal",
  },
  {
    title: "Software Engineer Intern",
    companyName: "Intel",
    jobId: "INTEL-SWE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://jobs.intel.com/",
    description: "Software Engineering Internship at Intel",
  },
  {
    title: "Web Developer Intern",
    companyName: "Oracle",
    jobId: "ORCL-WEB-INT",
    applyType: "EXTERNAL",
    applyLink: "https://careers.oracle.com/jobs/",
    description: "Web Development Internship at Oracle",
  },
  {
    title: "Machine Learning Intern",
    companyName: "NVIDIA",
    jobId: "NVDA-ML-INT",
    applyType: "EXTERNAL",
    applyLink: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite",
    description: "ML Internship at NVIDIA",
  },
  {
    title: "Software Engineer Intern",
    companyName: "IBM",
    jobId: "IBM-SWE-INT",
    applyType: "EXTERNAL",
    applyLink: "https://careers.ibm.com/job/search",
    description: "Software Engineering Internship at IBM",
  },
  {
    title: "Full Stack Engineer Intern",
    companyName: "Zoho",
    jobId: "ZOHO-FS-INT",
    applyType: "EXTERNAL",
    applyLink: "https://www.zoho.com/careers/",
    description: "Full Stack Internship at Zoho",
  },
];


const seedInternships = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    // Optional: clear old internships
    await Internship.deleteMany({ applyType: "EXTERNAL" });

    await Internship.insertMany(internships);

    console.log("✅ 20 internships seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedInternships();
