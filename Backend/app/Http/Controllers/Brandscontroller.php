<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\BrandResource;

class Brandscontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
/*    public function index()
    {
        return Brand::all();
    }
*/
    public function index(): JsonResponse
    {
        $brands = Brand::get();

        return response()->json(['list' => BrandResource::collection($brands)], 200);
    }

    public function brandEvents(Request $request){
        return Brand::where('title', $request->title)->first()->events;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
