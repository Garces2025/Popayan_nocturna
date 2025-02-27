<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Comment;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Event::with('category', 'brand')->get();
        // return response()->json(['success' => true, 'title' => 'events', 'data' => $events]);
    }

    public function search(Request $request){
        $events = Event::where('title', 'like', '%'.$request->text.'%')
                ->orWhere('description', 'like', '%'.$request->text.'%')
                ->with('category', 'brand') 
                ->get();
                
        return $events;
    }

    public function show(Request $request){
        return Event::with('brand', 'category')->find($request->id);
    }

    public function comments(Request $request){
        $event = Event::find($request->event_id);
        $comments = Comment::where('event_id', $event->id)->with('user.profile')->get();

        return $comments;
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
    public function destroy(Event $event)
    {
        $event->delete();
        $events = Event::with('category', 'brand')->get();

        return response()->json(['success' => true, 'events' => $events]);
    }
}
