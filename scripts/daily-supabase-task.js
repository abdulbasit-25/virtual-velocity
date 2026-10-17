const { createClient } = require("@supabase/supabase-js");

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function fetchData() {
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.",
    );
    process.exitCode = 1;
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Fetching data from Supabase...");
  const { data, error } = await supabase.from("reviews").select("*");

  if (error) {
    console.error("Error fetching data:", error.message);
    process.exitCode = 1;
    return;
  }

  console.log(`Fetched ${data?.length ?? 0} review records.`);
}

fetchData().catch((error) => {
  console.error("Supabase review task failed:", error);
  process.exitCode = 1;
});
