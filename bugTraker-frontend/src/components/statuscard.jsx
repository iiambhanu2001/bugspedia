function Statcard({ status,value, color }) {

  return (
    <div className="bg-white rounded-lg shadow p-4" >
      <p className="text-sm text-gray-500">{status}</p>
      <p className={`text-2xl font-seminold ${color}`}>{value}</p>

    </div>
  );
}

export default Statcard;
