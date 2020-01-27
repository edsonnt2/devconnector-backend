module.exports = Fields = (
  {
    company,
    website,
    location,
    status,
    skills,
    bio,
    github_username,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  },
  profileFields
) => {
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (github_username) profileFields.github_username = github_username;
  if (github_username) profileFields.github_username = github_username;
  if (skills)
    profileFields.skills = skills.split(",").map(skill => skill.trim());

  // Criar objeto de social
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
};
